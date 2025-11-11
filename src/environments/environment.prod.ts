export const environment = {
  production: true,
  apiUrl: (typeof window !== 'undefined'
    ? (window as any).__APP_API_URL__
    : 'https://cloudsys-portal-b13wk6082-karimadel66kaaa-gmailcoms-projects.vercel.app/')
}
