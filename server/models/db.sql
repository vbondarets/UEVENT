CREATE database uevent;
CREATE USER 'vbondarets' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON uevent.* TO 'vbondarets';

use uevent;
