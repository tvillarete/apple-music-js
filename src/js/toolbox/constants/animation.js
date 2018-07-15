import { keyframes } from 'styled-components';

export default {
   fadeIn: keyframes`
      0% {
         opacity: 0;
      }
   `,

   slideInFromBottom: keyframes`
      0% {
         transform: translateY(100vh);
      }
   `,

   slideOutToBottom: keyframes`
      100% {
         transform: translateY(100vh);
      }
   `,
};
