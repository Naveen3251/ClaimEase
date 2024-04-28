

export async function POST(request:Request){
    const data=await request.formData();
    const insurancePolicy: File | null = data.get('insurancePolicy') as File;
    const driverLicense: File | null = data.get('driverLicense') as File;
    const registrationCertificate: File | null = data.get('registrationCertificate') as File;
    const fir: File | null = data.get('fir') as File;
    const damagesEstimate: File | null = data.get('damagesEstimate') as File;
    const medicalReport: File | null = data.get('medicalReport') as File;
    const otherExpenses: File | null = data.get('otherExpenses') as File;

    

}