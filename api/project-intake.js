import emailjs from '@emailjs/nodejs';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Validate required fields
    if (!formData) {
      return res.status(400).json({ error: 'Missing form data' });
    }

    // Get EmailJS credentials from environment variables
    const emailjsPublicKey = process.env.EMAILJS_PUBLIC_KEY;
    const emailjsServiceId = process.env.EMAILJS_SERVICE_ID;
    const emailjsTemplateId = process.env.EMAILJS_PROJECT_INTAKE_TEMPLATE_ID;
    const emailjsPrivateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!emailjsPublicKey || !emailjsServiceId || !emailjsTemplateId || !emailjsPrivateKey) {
      return res.status(500).json({ error: 'EmailJS configuration missing' });
    }

    // Initialize EmailJS with private key for server-side
    emailjs.init(emailjsPrivateKey);

    // Prepare template parameters
    const templateParams = {
      ...formData,
      form_submit_date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      emailjsServiceId,
      emailjsTemplateId,
      templateParams
    );

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Project intake form submitted successfully',
      emailjsResponse: response
    });

  } catch (error) {
    console.error('Project intake submission error:', error);
    
    return res.status(500).json({ 
      error: 'Failed to submit project intake form',
      details: error.message 
    });
  }
}
