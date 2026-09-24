export type CompanyStatus = "draft" | "published" | "archived";
export interface CompanyContent { id: string; overview: string; vision: string; mission: string; objectives: string[]; duties: string[]; approach: string[]; ownershipAccountability: string | null; headOffice: string | null; seoTitle: string | null; seoDescription: string | null; status: CompanyStatus; updatedAt: string; }
export interface CompanyItem { id: string; title: string; description: string; sortOrder: number; active: boolean; imageUrl?: string | null; }
export interface CompanyHistory extends CompanyItem { yearLabel: string; status: CompanyStatus; }
export interface CompanyStatistic { id: string; label: string; displayValue: string; description: string | null; sortOrder: number; active: boolean; }
export interface CompanyPartner extends CompanyItem { shortName: string | null; category: string | null; logoUrl: string | null; website: string | null; }
export interface CompanyLegalEntity extends CompanyItem { documentType: string | null; reference: string | null; }
export interface CompanyCertification extends CompanyItem { certificationType: string | null; issuingOrganization: string | null; issueDate: string | null; }
export interface CompanyOrganization extends CompanyItem { name: string | null; position: string; department: string | null; parentPosition: string | null; photoUrl: string | null; }
export interface CompanyBundle { content: CompanyContent | null; history: CompanyHistory[]; values: CompanyItem[]; statistics: CompanyStatistic[]; partners: CompanyPartner[]; legalEntities: CompanyLegalEntity[]; certifications: CompanyCertification[]; organization: CompanyOrganization[]; }
