#!/bin/sh
set -e

echo "⏳ Waiting for MinIO..."
until mc alias set local "$MINIO_ENDPOINT" "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD" 2>/dev/null; do
  sleep 2
done

echo "✅ MinIO reachable"

# Create bucket if not exists
mc mb --ignore-existing local/"$MINIO_BUCKET"

mc mb --ignore-existing local/"$MINIO_BUCKET"/recipe

mc mb --ignore-existing local/"$MINIO_BUCKET"/utensil

mc mb --ignore-existing local/"$MINIO_BUCKET"/ingredient

mc mb --ignore-existing local/"$MINIO_BUCKET"/users

# Upload default images (idempotent)
mc cp --recursive /defaults/recipe local/"$MINIO_BUCKET"/

mc cp --recursive /defaults/utensil local/"$MINIO_BUCKET"/

mc cp --recursive /defaults/ingredient local/"$MINIO_BUCKET"/

mc cp --recursive /defaults/user local/"$MINIO_BUCKET"/



echo "🎉 MinIO initialization completed"
