import { Inter, Montserrat, Orbitron, Poppins } from '@next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'], // Sesuaikan weight yang diperlukan
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  // weight: ['400', '700'], // Sesuaikan weight yang diperlukan
});

export const orbitron = Orbitron({
    subsets: ['latin'],
    // weight: ['400', '700'], // Sesuaikan weight yang diperlukan
  });

 export const poppins =  Poppins({ weight: ['400', '600'], subsets: ['latin'], display: 'swap' })