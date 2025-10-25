# Backup Scripts

This directory contains scripts for manual database snapshot/restore, data backup, and disaster recovery procedures.

## Backup Categories

### Database Backups
- **PostgreSQL Backups**: Database dump and restore
- **MySQL Backups**: MySQL database backup procedures
- **MongoDB Backups**: Document database backup procedures
- **Redis Backups**: Cache database backup procedures

### File System Backups
- **Application Files**: Application code and configuration
- **Upload Files**: User uploads and media files
- **Configuration Files**: System and application configuration
- **Log Files**: Application and system logs

### Cloud Storage Backups
- **S3 Backups**: AWS S3 backup procedures
- **Azure Blob**: Azure Blob storage backups
- **GCP Storage**: Google Cloud Storage backups
- **Cross-Region**: Multi-region backup replication

## Database Backup Scripts

### PostgreSQL Backup
```bash
#!/bin/bash
# backup-postgres.sh - PostgreSQL database backup

# Configuration
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="inopsio"
DB_USER="postgres"
BACKUP_DIR="/backups/postgres"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="inopsio_backup_${DATE}.sql"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create database backup
echo "Creating PostgreSQL backup..."
pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME \
    --verbose --clean --no-owner --no-privileges \
    --file="$BACKUP_DIR/$BACKUP_FILE"

# Compress backup
echo "Compressing backup..."
gzip "$BACKUP_DIR/$BACKUP_FILE"

# Upload to cloud storage
echo "Uploading to cloud storage..."
aws s3 cp "$BACKUP_DIR/$BACKUP_FILE.gz" s3://inopsio-backups/postgres/

# Cleanup old backups (keep 30 days)
echo "Cleaning up old backups..."
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete

echo "PostgreSQL backup complete: $BACKUP_FILE.gz"
```

### MySQL Backup
```bash
#!/bin/bash
# backup-mysql.sh - MySQL database backup

# Configuration
DB_HOST="localhost"
DB_PORT="3306"
DB_NAME="inopsio"
DB_USER="root"
BACKUP_DIR="/backups/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="inopsio_mysql_${DATE}.sql"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create database backup
echo "Creating MySQL backup..."
mysqldump -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASSWORD \
    --single-transaction --routines --triggers \
    $DB_NAME > "$BACKUP_DIR/$BACKUP_FILE"

# Compress backup
echo "Compressing backup..."
gzip "$BACKUP_DIR/$BACKUP_FILE"

# Upload to cloud storage
echo "Uploading to cloud storage..."
aws s3 cp "$BACKUP_DIR/$BACKUP_FILE.gz" s3://inopsio-backups/mysql/

# Cleanup old backups
echo "Cleaning up old backups..."
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete

echo "MySQL backup complete: $BACKUP_FILE.gz"
```

### MongoDB Backup
```bash
#!/bin/bash
# backup-mongodb.sh - MongoDB database backup

# Configuration
DB_HOST="localhost"
DB_PORT="27017"
DB_NAME="inopsio"
BACKUP_DIR="/backups/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="inopsio_mongo_${DATE}"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create database backup
echo "Creating MongoDB backup..."
mongodump --host $DB_HOST:$DB_PORT --db $DB_NAME \
    --out "$BACKUP_DIR/$BACKUP_FILE"

# Compress backup
echo "Compressing backup..."
tar -czf "$BACKUP_DIR/$BACKUP_FILE.tar.gz" -C "$BACKUP_DIR" "$BACKUP_FILE"
rm -rf "$BACKUP_DIR/$BACKUP_FILE"

# Upload to cloud storage
echo "Uploading to cloud storage..."
aws s3 cp "$BACKUP_DIR/$BACKUP_FILE.tar.gz" s3://inopsio-backups/mongodb/

# Cleanup old backups
echo "Cleaning up old backups..."
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete

echo "MongoDB backup complete: $BACKUP_FILE.tar.gz"
```

## File System Backup Scripts

### Application Files Backup
```bash
#!/bin/bash
# backup-app-files.sh - Application files backup

# Configuration
APP_DIR="/opt/inopsio"
BACKUP_DIR="/backups/app-files"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="inopsio_app_${DATE}.tar.gz"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create application backup
echo "Creating application files backup..."
tar -czf "$BACKUP_DIR/$BACKUP_FILE" \
    --exclude="node_modules" \
    --exclude=".git" \
    --exclude="logs" \
    --exclude="tmp" \
    -C "$(dirname $APP_DIR)" "$(basename $APP_DIR)"

# Upload to cloud storage
echo "Uploading to cloud storage..."
aws s3 cp "$BACKUP_DIR/$BACKUP_FILE" s3://inopsio-backups/app-files/

# Cleanup old backups
echo "Cleaning up old backups..."
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete

echo "Application files backup complete: $BACKUP_FILE"
```

### Upload Files Backup
```bash
#!/bin/bash
# backup-uploads.sh - User uploads backup

# Configuration
UPLOADS_DIR="/opt/inopsio/uploads"
BACKUP_DIR="/backups/uploads"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="inopsio_uploads_${DATE}.tar.gz"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create uploads backup
echo "Creating uploads backup..."
tar -czf "$BACKUP_DIR/$BACKUP_FILE" -C "$UPLOADS_DIR" .

# Upload to cloud storage
echo "Uploading to cloud storage..."
aws s3 cp "$BACKUP_DIR/$BACKUP_FILE" s3://inopsio-backups/uploads/

# Cleanup old backups
echo "Cleaning up old backups..."
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete

echo "Uploads backup complete: $BACKUP_FILE"
```

## Restore Scripts

### PostgreSQL Restore
```bash
#!/bin/bash
# restore-postgres.sh - PostgreSQL database restore

# Configuration
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="inopsio"
DB_USER="postgres"
BACKUP_FILE="$1"

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo "Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Stop application services
echo "Stopping application services..."
docker-compose stop backend

# Drop existing database
echo "Dropping existing database..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "DROP DATABASE IF EXISTS $DB_NAME;"

# Create new database
echo "Creating new database..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "CREATE DATABASE $DB_NAME;"

# Restore database
echo "Restoring database..."
if [[ $BACKUP_FILE == *.gz ]]; then
    gunzip -c "$BACKUP_FILE" | psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME
else
    psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME < "$BACKUP_FILE"
fi

# Start application services
echo "Starting application services..."
docker-compose start backend

echo "PostgreSQL restore complete!"
```

### MySQL Restore
```bash
#!/bin/bash
# restore-mysql.sh - MySQL database restore

# Configuration
DB_HOST="localhost"
DB_PORT="3306"
DB_NAME="inopsio"
DB_USER="root"
BACKUP_FILE="$1"

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo "Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Stop application services
echo "Stopping application services..."
docker-compose stop backend

# Drop existing database
echo "Dropping existing database..."
mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASSWORD -e "DROP DATABASE IF EXISTS $DB_NAME;"

# Create new database
echo "Creating new database..."
mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASSWORD -e "CREATE DATABASE $DB_NAME;"

# Restore database
echo "Restoring database..."
if [[ $BACKUP_FILE == *.gz ]]; then
    gunzip -c "$BACKUP_FILE" | mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASSWORD $DB_NAME
else
    mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASSWORD $DB_NAME < "$BACKUP_FILE"
fi

# Start application services
echo "Starting application services..."
docker-compose start backend

echo "MySQL restore complete!"
```

## Automated Backup Scripts

### Full System Backup
```bash
#!/bin/bash
# backup-full-system.sh - Full system backup

# Configuration
BACKUP_DIR="/backups/full-system"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="inopsio_full_${DATE}.tar.gz"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup databases
echo "Backing up databases..."
./scripts/backup/backup-postgres.sh
./scripts/backup/backup-mysql.sh
./scripts/backup/backup-mongodb.sh

# Backup application files
echo "Backing up application files..."
./scripts/backup/backup-app-files.sh
./scripts/backup/backup-uploads.sh

# Backup configuration files
echo "Backing up configuration files..."
tar -czf "$BACKUP_DIR/config_${DATE}.tar.gz" \
    /etc/nginx \
    /etc/ssl \
    /opt/inopsio/config

# Create full system backup
echo "Creating full system backup..."
tar -czf "$BACKUP_DIR/$BACKUP_FILE" \
    -C /backups \
    postgres mysql mongodb app-files uploads

# Upload to cloud storage
echo "Uploading to cloud storage..."
aws s3 cp "$BACKUP_DIR/$BACKUP_FILE" s3://inopsio-backups/full-system/

# Cleanup old backups
echo "Cleaning up old backups..."
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete

echo "Full system backup complete: $BACKUP_FILE"
```

### Incremental Backup
```bash
#!/bin/bash
# backup-incremental.sh - Incremental backup

# Configuration
BACKUP_DIR="/backups/incremental"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="inopsio_incremental_${DATE}.tar.gz"
LAST_BACKUP="/backups/last-backup"

# Create backup directory
mkdir -p $BACKUP_DIR

# Find files modified since last backup
echo "Finding modified files..."
if [ -f "$LAST_BACKUP" ]; then
    find /opt/inopsio -type f -newer "$LAST_BACKUP" -print0 | \
        tar -czf "$BACKUP_DIR/$BACKUP_FILE" --null -T -
else
    echo "No previous backup found, creating full backup..."
    tar -czf "$BACKUP_DIR/$BACKUP_FILE" -C /opt inopsio
fi

# Update last backup timestamp
touch "$LAST_BACKUP"

# Upload to cloud storage
echo "Uploading to cloud storage..."
aws s3 cp "$BACKUP_DIR/$BACKUP_FILE" s3://inopsio-backups/incremental/

# Cleanup old backups
echo "Cleaning up old backups..."
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Incremental backup complete: $BACKUP_FILE"
```

## Disaster Recovery Scripts

### Disaster Recovery Plan
```bash
#!/bin/bash
# disaster-recovery.sh - Disaster recovery procedures

# Configuration
RECOVERY_DIR="/recovery"
BACKUP_SOURCE="s3://inopsio-backups"

# Create recovery directory
mkdir -p $RECOVERY_DIR

# Download latest backups
echo "Downloading latest backups..."
aws s3 sync $BACKUP_SOURCE $RECOVERY_DIR

# Restore databases
echo "Restoring databases..."
./scripts/backup/restore-postgres.sh $RECOVERY_DIR/postgres/latest.sql.gz
./scripts/backup/restore-mysql.sh $RECOVERY_DIR/mysql/latest.sql.gz

# Restore application files
echo "Restoring application files..."
tar -xzf $RECOVERY_DIR/app-files/latest.tar.gz -C /opt/

# Restore uploads
echo "Restoring uploads..."
tar -xzf $RECOVERY_DIR/uploads/latest.tar.gz -C /opt/inopsio/uploads/

# Start services
echo "Starting services..."
docker-compose up -d

# Verify recovery
echo "Verifying recovery..."
curl -f http://localhost:3000/health || echo "Frontend health check failed"
curl -f http://localhost:8000/health || echo "Backend health check failed"

echo "Disaster recovery complete!"
```

## Best Practices

### Backup Strategy
- **Regular Backups**: Automated daily backups
- **Retention Policy**: Keep backups for appropriate duration
- **Testing**: Regular backup restoration testing
- **Monitoring**: Backup success/failure monitoring

### Security
- **Encryption**: Encrypt sensitive backup data
- **Access Control**: Restrict backup access
- **Audit Logging**: Log all backup operations
- **Secure Storage**: Store backups in secure locations

## Getting Started

1. **Configure Backup**: Set up backup configuration
2. **Test Backups**: Test backup and restore procedures
3. **Schedule Backups**: Set up automated backup scheduling
4. **Monitor Backups**: Monitor backup success/failure
5. **Document Procedures**: Document backup and restore procedures

For detailed backup procedures, see the individual script documentation and examples.
