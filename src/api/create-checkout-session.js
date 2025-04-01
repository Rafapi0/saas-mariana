import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51R8u7lCHhUI3sohG2263UDcySbDKMu7GMTgm6bpqS2Mcg9YsaQjd8kn6a6Fq2tYOlWWnFjA4PDQlfNtlYbyhgsEf00WQENWX0a', {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { priceId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancelado`,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ message: 'Erro ao criar sessão de checkout' });
  }
} 