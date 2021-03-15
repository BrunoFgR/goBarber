ALTER TABLE `handover`.`deliveries`
ADD COLUMN `idSubTeamUnits` VARCHAR(255) NULL DEFAULT NULL AFTER `idBusinessColector`,
ADD COLUMN `IdSubTeamSubUnits` VARCHAR(255) NULL DEFAULT NULL AFTER `idSubTeamUnits`;
