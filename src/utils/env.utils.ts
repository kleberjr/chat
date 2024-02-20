export default function getFromEnv(key: string) {
  const variable = process.env[key];

  if (!variable) {
    throw new Error('Missing environment variable!');
  }
  
  return variable;
}