set role per_cen_owner;
set search_path=ggs_backups;

CREATE OR REPLACE FUNCTION personal_estados_trg()
  RETURNS trigger 
  LANGUAGE plpgsql
AS  
$BODY$
declare
  estado_anterior text;
begin
  if tg_op='INSERT' then
    select estado into strict estado_anterior
	  from ggs_backups.estado_personal
	  where predeterminado;
  else
    estado_anterior := old.estado;
  end if;
  new.estado := coalesce(new.estado, estado_anterior);
  return new;
end;
$BODY$;

-- /*
drop trigger if exists personal_estados_trg on personal;
CREATE TRIGGER personal_estados_trg
  BEFORE INSERT OR UPDATE OF estado
  ON personal
  FOR EACH ROW
  EXECUTE PROCEDURE personal_estados_trg();
-- */