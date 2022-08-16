set role per_cen_owner;
set search_path=ggs_backups;

CREATE OR REPLACE FUNCTION personal_comuna_trg()
  RETURNS trigger 
  LANGUAGE plpgsql
AS  
$BODY$
declare
  comuna_usuario text;
begin
  if new.comuna is null then 
    select comuna into strict comuna_usuario
	  from ggs_backups.usuarios u
	  where u.usuario=split_part(current_setting('application_name'),' ',1);
    new.comuna := comuna_usuario;
  end if;
  return new;
end;
$BODY$;

-- /*
drop trigger if exists personal_comuna_trg on personal;
CREATE TRIGGER personal_comuna_trg
  BEFORE INSERT
  ON personal
  FOR EACH ROW
  EXECUTE PROCEDURE personal_comuna_trg();
-- */