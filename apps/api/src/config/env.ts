/**
 * Environment Configuration
 *
 * Centralizes all environment variable access with type safety and validation
 */

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

  // Validation
  if (!config.databaseUrl && config.nodeEnv !== 'test') {
    console.warn(
      'Warning: DATABASE_URL not set. Database operations will fail.'
    );
  }

  return config;
}

// Export singleton config instance
export const config = loadConfig();
