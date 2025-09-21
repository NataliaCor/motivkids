import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

export default function bootstrap(context?: any) {
  // Handle the BootstrapContext if provided
  const applicationConfig = context 
    ? { ...config, context }
    : config;
    
  return bootstrapApplication(AppComponent, applicationConfig);
}