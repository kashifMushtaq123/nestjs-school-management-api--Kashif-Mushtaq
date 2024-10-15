import { Injectable, NotFoundException } from '@nestjs/common';
import { School } from './entities/school.entity';
import { Address } from './entities/address.entity';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>
  ) {}

  // Create a new school
  async createSchool(schoolData: Partial<School>): Promise<School> {
    const { address, organization } = schoolData;

    const addressEntity = await this.findOrCreateAddress(address);
    const organizationEntity = await this.findOrCreateOrganization(organization);

    // Creating a new school entry
    const school = this.schoolRepository.create({
      ...schoolData,
      address: addressEntity,
      organization: organizationEntity,
    });

    return this.schoolRepository.save(school);
  }

  // Helper function to find or create an address
  private async findOrCreateAddress(addressData: Address): Promise<Address> {
    let addressEntity = await this.addressRepository.findOne({
      where: {
        town: addressData.town,
        tehsil: addressData.tehsil,
        district: addressData.district,
        state: addressData.state,
      },
    });

    // If not found, create a new address
    if (!addressEntity) {
      addressEntity = this.addressRepository.create(addressData);
      await this.addressRepository.save(addressEntity);
    }

    return addressEntity;
  }

  // Helper function to find or create an organization
  private async findOrCreateOrganization(organizationData: Organization): Promise<Organization> {
    let organizationEntity = await this.organizationRepository.findOne({
      where: {
        name: organizationData.name,
      },
    });

    // If not found, create a new organization
    if (!organizationEntity) {
      organizationEntity = this.organizationRepository.create(organizationData);
      await this.organizationRepository.save(organizationEntity);
    }

    return organizationEntity;
  }

  // Update an existing school
  async updateSchool(id: number, schoolData: Partial<School>): Promise<School> {
    const existingSchool = await this.schoolRepository.findOne({ where: { id } });
    if (!existingSchool) {
      throw new NotFoundException('School not found');
    }

    // Update the existing school with new data
    Object.assign(existingSchool, schoolData);

    // Update address and organization if provided
    if (schoolData.address) {
      existingSchool.address = await this.findOrCreateAddress(schoolData.address);
    }

    if (schoolData.organization) {
      existingSchool.organization = await this.findOrCreateOrganization(schoolData.organization);
    }

    return this.schoolRepository.save(existingSchool);
  }

  // Get a school by its ID
  async getSchoolById(id: number): Promise<School> {
    const school = await this.schoolRepository.findOne({ where: { id } });
    if (!school) {
      throw new NotFoundException('School not found');
    }
    return school; 
  }

  // Get all schools
  async getAllSchools(): Promise<School[]> {
    return this.schoolRepository.find(); 
  }

  // Delete a school by its ID
  async deleteSchool(id: number): Promise<void> {
    const result = await this.schoolRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('School not found');
    }
  }
}