-- CITC Website Seed Data
-- Run this in Supabase SQL Editor

-- Teams
INSERT INTO teams (id, name, year) VALUES
  ('t_patron', 'Patron', 2025),
  ('t_mentors_2025', 'Mentors', 2025),
  ('t_exec_2025', 'Executive Committee', 2025),
  ('t_faculty', 'Faculty Advisors', 2025)
ON CONFLICT (id) DO NOTHING;

-- Members
INSERT INTO members (name, type, title, department, email, photo, member_year, team_id, college_year, socials) VALUES
  ('Er. Amit Shrivastava', 'Patron', 'Patron', 'HOD, Department of Computer Engineering', 'hod.computer@ncit.edu.np', '/media/2025/members/faculty_advisor_amit.avif', 2025, 't_patron', NULL, '{}'),
  ('Manash Dev Bhatta', 'Executive', NULL, NULL, 'manash.221224@ncit.edu.np', '/media/2025/members/manash_dev_bhatta.avif', 2025, 't_mentors_2025', 4, '{"github":"https://github.com/dsxmanash","instagram":"https://www.instagram.com/sunfloweraholic01"}'),
  ('Niraj Bhusal', 'Executive', NULL, NULL, 'niraj.221315@ncit.edu.np', '/media/2025/members/niraj_bhusal.avif', 2025, 't_mentors_2025', 4, '{"github":"https://github.com/niraj5511","linkedin":"https://www.linkedin.com/in/niraj-bhusal-6262b830a/","instagram":"https://www.instagram.com/niraj_bhusal551"}'),
  ('Pratik Mishra', 'Executive', NULL, NULL, 'pratikmis14@gmail.com', '/media/2025/members/pratik_mishra.avif', 2025, 't_mentors_2025', 4, '{"github":"https://github.com/Retr0-0","facebook":"https://www.facebook.com/Prats8914"}'),
  ('Abishek Khadka', 'Executive', NULL, NULL, 'abishek.231303@ncit.edu.np', '/media/2025/members/abishek_khadka.avif', 2025, 't_exec_2025', 3, '{"github":"https://github.com/khadkaabishek","linkedin":"https://www.linkedin.com/in/abishekkhadkaa/","instagram":"https://www.instagram.com/awisek.null/","website":"https://abishek-khadka.com.np/"}'),
  ('Anuroop Tater', 'Executive', NULL, NULL, 'anuroop.231209@ncit.edu.np', '/media/2025/members/anuroop_tater.avif', 2025, 't_exec_2025', 3, '{}'),
  ('Apil Khadka', 'Executive', NULL, NULL, 'apil.231210@ncit.edu.np', '/media/2025/members/apil_khadka.avif', 2025, 't_exec_2025', 3, '{"github":"https://github.com/Apil-Khadka","linkedin":"https://www.linkedin.com/in/apil-khadka/","instagram":"https://www.instagram.com/apil.me/","website":"https://apilkhadka.com.np/"}'),
  ('Arpan Adhikhari', 'Executive', NULL, NULL, 'arpan.231309@ncit.edu.np', '/media/2025/members/arpan_adhikari.avif', 2025, 't_exec_2025', 3, '{"github":"https://github.com/adhikari-arpan","linkedin":"https://www.linkedin.com/in/adhikari-arpan63/","instagram":"https://www.instagram.com/adhikari__arpan","website":"https://arpanadhikari7.com.np/"}'),
  ('Niraj Bhatta', 'Executive', NULL, NULL, 'niraj.231326@ncit.edu.np', '/media/2025/members/niaj_bhatta.avif', 2025, 't_exec_2025', 3, '{"github":"https://github.com/Niraj-Bhatta","linkedin":"www.linkedin.com/in/nirajbhatta559","instagram":"https://www.instagram.com/niraj_bhatta_4/"}'),
  ('Sandesh Khadka', 'Executive', NULL, NULL, 'sandesh.231335@ncit.edu.np', '/media/2025/members/sandesh_khadka.avif', 2025, 't_exec_2025', 3, '{"github":"https://github.com/SandeshKhadka23","linkedin":"https://www.linkedin.com/in/sandeshkhadka1/","instagram":"https://www.instagram.com/sandesh.khadka.2/?hl=en"}'),
  ('Saru Chauwal', 'Executive', NULL, NULL, 'saru.231239@ncit.edu.np', '/media/2025/members/saru_chauwal.avif', 2025, 't_exec_2025', 3, '{"github":"https://github.com/SaruChauwal","instagram":"https://www.instagram.com/_saru00/"}'),
  ('Shyam Kishor Sah', 'Executive', NULL, NULL, 'shyam.231339@ncit.edu.np', '/media/2025/members/shyam_kishor_shah.avif', 2025, 't_exec_2025', 3, '{}'),
  ('Sudip Shrestha', 'Executive', NULL, NULL, 'sudip.231244@ncit.edu.np', '/media/2025/members/sudip_shrestha.avif', 2025, 't_exec_2025', 3, '{"github":"https://github.com/sudipshrestha-4","instagram":"https://www.instagram.com/sudip_shrestha4/"}'),
  ('Abaneesh Shrestha', 'Executive', NULL, NULL, 'abaneesh.241203@ncit.edu.np', '/media/2025/members/abaneesh_shrestha.avif', 2025, 't_exec_2025', 2, '{"github":"https://github.com/abaneeshshrestha-glitch","linkedin":"www.linkedin.com/in/Vanity URL name","instagram":"https://www.instagram.com/abaneeeeshh/"}'),
  ('Biraj Joshi', 'Executive', NULL, NULL, 'biraj.241212@ncit.edu.np', '/media/2025/members/biraj_joshi.avif', 2025, 't_exec_2025', 2, '{}'),
  ('Iksha Gurung', 'Executive', NULL, NULL, 'iksha.241312@ncit.edu.np', '/media/2025/members/iksha_gurung.avif', 2025, 't_exec_2025', 2, '{"github":"iksha241312-debug"}'),
  ('Pranish Manandhar', 'Executive', NULL, NULL, 'pranish.241324@ncit.edu.np', '/media/2025/members/pranish_manandhar.avif', 2025, 't_exec_2025', 2, '{"github":"https://github.com/PranishManandhar","linkedin":"https://www.linkedin.com/in/pranish-manandhar-54452b245/","instagram":"https://www.instagram.com/_pranish.manandhar/"}'),
  ('Anamol Rijal', 'Executive', NULL, NULL, 'anamol@ncit.edu.np', '/media/2025/members/anmol.avif', 2025, 't_exec_2025', 1, '{"github":"https://github.com/","linkedin":"https://www.linkedin.com/","instagram":"https://www.instagram.com/"}');

-- Events
INSERT INTO events (id, title, date, time, location, description, image, status, registration_link, tags, gallery) VALUES
  ('001', 'Kickstart Your Tech Journey: Explore • Learn • Build', '2024-12-08', '11:00 AM - 1:00 PM', 'NCIT Hall', '**Theme:** "Explore • Learn • Build — Your Journey as a Computer Engineer"\n\n## EVENT OBJECTIVES\n\n- Introduce CITC — purpose, vision, activities\n- Familiarize students with major domains of Computer Engineering\n- Give short & practical roadmaps for each domain\n- Introduce essential tools, software, and platforms useful for daily CE life\n- Show benefits & opportunities — GitHub Student Pack, learning platforms, hackathons\n- Build excitement, confidence, and curiosity among participants\n- Recruit engaged members for future events', '/event/001/WhatsApp Image 2025-12-08 at 19.28.39.jpeg', 'past', NULL, '["Orientation","Tech Journey","Introductory"]', '["/event/001/WhatsApp Image 2025-12-08 at 19.28.39.jpeg","/event/001/WhatsApp Image 2025-12-08 at 19.28.41 (1).jpeg","/event/001/WhatsApp Image 2025-12-08 at 19.28.41.jpeg"]'),
  ('002', 'Prompt to Image – AI Creativity Competition', '2026-01-29', '1 Week (Online) + Physical battle', 'Online', '## Introduction\n\nArtificial Intelligence is reshaping creative expression, with **prompt engineering** emerging as a crucial skill that connects human intent with AI-generated outcomes.', '/event/002/top_image.jpg', 'past', 'https://citc.ncit.edu.np/register/ai', '["AI","Competition","Prompt Engineering","Creativity"]', '["/event/002/top_image.jpg","/event/002/1c135d51-1936-4f56-9630-9ff17e23b0b4.jpg","/event/002/6da29576-c123-446c-b096-82d613ffa521.jpg"]'),
  ('003', 'IoT Workshop: IoT Hardware Forge', '2026-02-02', '6 Days (2 Hours Daily)', 'NCIT Room:125', '## Introduction\n\nThe **Computer Engineering Innovation and Tech Club (CITC)**, in collaboration with the Department of Computer Engineering, NCIT, presents **"IoT Hardware Workshop"**, an intensive 6-day workshop designed to bridge the gap between theoretical knowledge and practical hardware implementation.', '/event/003/IoTExpo2082.png', 'past', NULL, '["IoT","Embedded Systems","Hardware","Workshop"]', NULL)
ON CONFLICT (id) DO NOTHING;
