/**
 * Environment Configuration
 *
 * Centralizes all environment variable access with type safety and validation
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Load .env file manually (avoids dotenv dependency)
function loadEnvFile() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const envPath = resolve(__dirname, '../../.env');

  if (existsSync(envPath)) {
    const envContent = readFileSync(envPath, 'utf-8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          let value = valueParts.join('=');
          // Remove surrounding quotes
          if ((value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      }
    }
  }
}

// Load env file before anything else
loadEnvFile();

export interface AppConfig {
  // Server
  port: number;
  host: string;
  nodeEnv: 'development' | 'production' | 'test';

  // Database
  databaseUrl: string;

  // CORS
  corsOrigin: string[];

  // Logging
  logLevel: string;
}

/**
 * Load and validate environment configuration
 */
export function loadConfig(): AppConfig {
  const config: AppConfig = {
    // Server configuration
    port: parseInt(process.env.PORT || '4000', 10),
    host: process.env.HOST || '0.0.0.0',
    nodeEnv: (process.env.NODE_ENV as AppConfig['nodeEnv']) || 'development',

    // Database
    databaseUrl: process.env.DATABASE_URL || '',

    // CORS origins (comma-separated in env)
    corsOrigin:
      process.env.CORS_ORIGIN?.split(',') || [
        'http://localhost:3000',
        'http://localhost:5173',
      ],

    // Logging
    logLevel: process.env.LOG_LEVEL || 'info',
  };

  // Validation - using mock data, so database is optional
  if (!config.databaseUrl && config.nodeEnv !== 'test') {
    console.log(
      'Info: DATABASE_URL not set. Using mock data for development.'
    );
  }

  return config;
}

// Export singleton config instance
export const config = loadConfig();
