-- Phase 5: authoritative, structured company-content CMS.
create type public.company_publication_status as enum ('draft', 'published', 'archived');

create table public.company_content (
  id uuid primary key default gen_random_uuid(), content_key text not null unique default 'primary' check (content_key = 'primary'),
  overview text not null default '', vision text not null default '', mission text not null default '',
  objectives text[] not null default '{}', duties text[] not null default '{}', approach text[] not null default '{}',
  ownership_accountability text, head_office text, seo_title text, seo_description text,
  status public.company_publication_status not null default 'draft', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.company_history (id uuid primary key default gen_random_uuid(), year_label text not null, title text not null, description text not null, sort_order integer not null default 0 check(sort_order >= 0), status public.company_publication_status not null default 'draft', created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.company_values (id uuid primary key default gen_random_uuid(), title text not null, description text not null default '', icon_key text, sort_order integer not null default 0 check(sort_order >= 0), active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.company_statistics (id uuid primary key default gen_random_uuid(), label text not null, display_value text not null, description text, sort_order integer not null default 0 check(sort_order >= 0), active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.company_partners (id uuid primary key default gen_random_uuid(), name text not null, short_name text, category text, logo_url text, website text, description text, sort_order integer not null default 0 check(sort_order >= 0), active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.company_legal_entities (id uuid primary key default gen_random_uuid(), name text not null, document_type text, reference text, description text, image_url text, sort_order integer not null default 0 check(sort_order >= 0), active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.company_certifications (id uuid primary key default gen_random_uuid(), name text not null, certification_type text, issuing_organization text, issue_date text, description text, image_url text, sort_order integer not null default 0 check(sort_order >= 0), active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.company_organization (id uuid primary key default gen_random_uuid(), name text, position text not null, department text, biography text, photo_url text, parent_position text, sort_order integer not null default 0 check(sort_order >= 0), active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now());

create index company_history_public_idx on public.company_history(status, sort_order);
create index company_partners_public_idx on public.company_partners(active, sort_order);
create index company_statistics_public_idx on public.company_statistics(active, sort_order);

create trigger company_content_updated before update on public.company_content for each row execute function public.set_updated_at();
create trigger company_history_updated before update on public.company_history for each row execute function public.set_updated_at();
create trigger company_values_updated before update on public.company_values for each row execute function public.set_updated_at();
create trigger company_statistics_updated before update on public.company_statistics for each row execute function public.set_updated_at();
create trigger company_partners_updated before update on public.company_partners for each row execute function public.set_updated_at();
create trigger company_legal_entities_updated before update on public.company_legal_entities for each row execute function public.set_updated_at();
create trigger company_certifications_updated before update on public.company_certifications for each row execute function public.set_updated_at();
create trigger company_organization_updated before update on public.company_organization for each row execute function public.set_updated_at();

alter table public.company_content enable row level security;
alter table public.company_history enable row level security;
alter table public.company_values enable row level security;
alter table public.company_statistics enable row level security;
alter table public.company_partners enable row level security;
alter table public.company_legal_entities enable row level security;
alter table public.company_certifications enable row level security;
alter table public.company_organization enable row level security;

-- Anonymous readers can only see records deliberately exposed to the public.
create policy "public read published company content" on public.company_content for select to anon, authenticated using (status = 'published');
create policy "public read published company history" on public.company_history for select to anon, authenticated using (status = 'published');
create policy "public read active company values" on public.company_values for select to anon, authenticated using (active);
create policy "public read active company statistics" on public.company_statistics for select to anon, authenticated using (active);
create policy "public read active company partners" on public.company_partners for select to anon, authenticated using (active);
create policy "public read active company legal entities" on public.company_legal_entities for select to anon, authenticated using (active);
create policy "public read active company certifications" on public.company_certifications for select to anon, authenticated using (active);
create policy "public read active company organization" on public.company_organization for select to anon, authenticated using (active);

-- One role system, no browser-side role trust, and no public write policy.
do $$ declare t text; begin foreach t in array array['company_content','company_history','company_values','company_statistics','company_partners','company_legal_entities','company_certifications','company_organization'] loop
 execute format('create policy "admins manage %s" on public.%I for all to authenticated using (public.has_admin_role(array[''super_admin'', ''admin'', ''editor'']::public.admin_role[])) with check (public.has_admin_role(array[''super_admin'', ''admin'', ''editor'']::public.admin_role[]))', t, t);
end loop; end $$;
create policy "admins manage company media" on storage.objects for all to authenticated using (bucket_id = 'company-media' and public.has_admin_role(array['super_admin','admin','editor']::public.admin_role[])) with check (bucket_id = 'company-media' and public.has_admin_role(array['super_admin','admin','editor']::public.admin_role[]));

-- Faithful data migration matrix: src/data/company.ts and existing About/Organization views -> tables below.
insert into public.company_content (overview, vision, mission, objectives, duties, approach, ownership_accountability, head_office, seo_title, seo_description, status) values
('Hibir Construction Corporation (HCC) is a government-owned construction enterprise headquartered in Bahir Dar, Amhara Regional State, accountable to the Amhara Regional Public Enterprises'' Authority. The corporation is owned and run entirely by Ethiopian professionals. Originally established through Proclamation No. 71/2010 as Amhara Road Works Enterprise, re-established through Proclamation No. 170/2018, and elevated to full corporation status under Proclamation No. 214/2024.', 'To be one of the best contractors in Africa''s construction industry by 2030.', 'Building infrastructures with the desired quality, timely, and thereby creating a profitable corporation.', ARRAY['Construct new quality roads with economic feasibility that support regional and national development.','Maintain and upgrade existing road infrastructure to modern standards.','Produce and supply construction materials required for road and building works.','Build institutional capacity through training and technology transfer.','Operate profitably and sustainably as a public enterprise.'], ARRAY['Construct, improve and maintain roads at regional and national level.','Design and build bridges, culverts and drainage structures.','Produce asphalt, crushed aggregate and other construction inputs.','Deliver building and urban infrastructure works.','Provide road-sector capacity building and operator training.'], ARRAY['Strict scheduling and planning for on-time delivery.','Partnering and good communication with project stakeholders.','Strong and timely project monitoring and evaluation systems.','Professional contractual project management at every stage.'], 'Government-owned enterprise accountable to the Amhara Regional Public Enterprises Authority.', 'Bahir Dar, Amhara Regional State, near Bahir Dar University, Gish Abay Campus.', 'About Hibir Construction Corporation | Ethiopia', 'Hibir Construction Corporation is a government-owned GC-1 contractor in Bahir Dar, Amhara Regional State.', 'published');
insert into public.company_history(year_label,title,description,sort_order,status) values ('2010','Establishment','Founded as Amhara Road Works Enterprise by Proclamation No. 71/2010.',1,'published'),('2018','Re-establishment','Re-established by Proclamation No. 170/2018.',2,'published'),('2024','Corporation Upgrade','Upgraded to corporation level by Proclamation No. 214/2024 and renamed Hibir Construction Corporation.',3,'published');
insert into public.company_values(title,description,sort_order) values ('Team Work','Collaborative effort across all departments and project sites.',1),('Cost Effectiveness','Maximising value while maintaining the highest quality standards.',2),('Industriousness','Relentless commitment and hard work in every project we undertake.',3),('Honesty','Transparent operations and ethical business practices at all levels.',4),('Loyalty','Dedicated to our nation, clients and employees with unwavering commitment.',5);
insert into public.company_statistics(label,display_value,sort_order) values ('staff','843',1),('total vehicles, plants and machinery','282',2),('vehicles','155',3),('plants','10',4),('machinery','117',5),('annual turnover','ETB 3.4B+',6),('active project contracts','ETB 25B+',7),('recorded capital','ETB 929M+',8),('general contractor grade','GC-1',9);
insert into public.company_organization(name,position,parent_position,sort_order) values (null,'Board of Management',null,1),('Ato Mebit Admas','Chief Executive Officer','Board of Management',2),(null,'Chief Technical Advisory','Chief Executive Officer',3),(null,'Marketing & Promotion Directorate','Chief Executive Officer',4),(null,'Business Development & Planning','Chief Executive Officer',5),(null,'Legal Service Directorate','Chief Executive Officer',6),(null,'Internal Audit Directorate','Chief Executive Officer',7),(null,'Deputy CEO — Construction / Projects','Chief Executive Officer',8),(null,'Deputy CEO — Administrative','Chief Executive Officer',9),(null,'Deputy CEO — Machinery & Production / AA Branch / Mega Projects','Chief Executive Officer',10);

-- Partner logos remain intentionally empty until approved assets are uploaded to company-media.
insert into public.company_partners(name,short_name,category,sort_order) values
('Ethiopian Roads Administration (ERA)','ERA','Road Authorities',1),
('ANRS Road & Transport Bureau','ANRS RTB','Government',2),
('ANRS Roads Bureau','ANRS RB','Road Authorities',3),
('ANRS Industry Parks Development Corporation','ANRS IPDC','Industrial Development',4),
('Amhara National Regional State','ANRS','Government',5),
('Regional Public Enterprises'' Authority','RPEA','Government',6),
('Ethiopian Construction Authority','ECA','Government',7),
('Ethiopian Kaizen Institute','EKI','Other Institutional Partners',8),
('Ethiopian Sugar Corporation','ESC','Industrial Development',9),
('Ethiopian Ports Corporation','EPC','Industrial Development',10),
('Bahir Dar City Administration','Bahir Dar','City Administrations',11),
('Bahir Dar City Roads Authority','BD Roads','Road Authorities',12),
('Gondar City Administration','Gondar','City Administrations',13),
('Dessie City Administration','Dessie','City Administrations',14),
('Woldia City Administration','Woldia','City Administrations',15),
('Worabi City Administration','Worabi','City Administrations',16),
('Mekane Eyesus City Administration','Mekane Eyesus','City Administrations',17),
('Lalibela Town Administration','Lalibela','City Administrations',18),
('Dangila Town Administration','Dangila','City Administrations',19);
insert into public.company_legal_entities(name,document_type,reference,description,sort_order) values
('Establishment Proclamation','Proclamation','No. 71/2010','Established as Amhara Road Works Enterprise on 26 January 2010.',1),
('Re-establishment Proclamation','Proclamation','No. 170/2018','Re-established on 31 March 2018 with recorded capital of Birr 929.3 Million.',2),
('Corporation Proclamation','Proclamation','No. 214/2024','Upgraded to corporation level and renamed Hibir Construction Corporation.',3),
('Commercial Registration Certificate','Registration','980/2008','Registered trade record held with the regional trade bureau.',4),
('Business Licence','Licence','General Construction','Licensed for general construction works nationwide.',5),
('Contractor Licence','Licence','GC-1 (Grade One)','Grade One General Contractor licence from the Ethiopian Construction Authority.',6),
('TIN Certificate','Tax Record','0013324621','Taxpayer identification registration certificate.',7),
('VAT Registration Certificate','Tax Record','3028900006','Value added tax registration certificate.',8),
('Tax Clearance Certificate','Tax Record','Annual','Current tax clearance issued by the ANRS Bureau of Revenue.',9),
('Board Charter','Governance','Managing Board','Governance charter defining the mandate of the managing board.',10),
('Accountability Instrument','Governance','RPEA','Accountable to the Regional Public Enterprises'' Authority.',11);
insert into public.company_certifications(name,certification_type,issuing_organization,issue_date,description,sort_order) values
('National Kaizen Award — 1st Place','Award','Ethiopian Kaizen Institute','2019','Ranked first nationally for implementation of first-level Kaizen, awarded 29 October 2019.',1),
('Revenue Compliance Recognition','Recognition','ANRS Bureau of Revenue','2023','Recognised for outstanding tax compliance and corporate responsibility.',2),
('Quality Management Certificate','Certificate','Internal QA Programme','2024','Certified quality control programme covering procurement, construction and inspection.',3),
('Occupational Safety Recognition','Recognition','ANRS Labour & Skills Bureau','2024','Recognition for scientific HSE procedures and workplace safety performance.',4),
('Regional Development Contribution Award','Award','Amhara National Regional State','2025','Awarded for contribution to regional infrastructure and national development.',5),
('Kaizen Implementation Certificate','Certificate','Ethiopian Kaizen Institute','2020','Certificate confirming continued implementation of Kaizen across corporate operations.',6);
