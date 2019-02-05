import { keyframes } from 'styled-components';

export default {
   fadeIn: keyframes`
      0% {
         opacity: 0;
      }
   `,

   fadeOut: keyframes`
      100% {
         opacity: 0;
      }
   `,

   scale: keyframes`
      0% {
         transform: scale(0);
         opacity: 0;
      }
   `,

   scaleOut: keyframes`
      100% {
         transform: scale(0);
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

   slideInFromRight: keyframes`
      0% {
         transform: translateX(100vw);
      }
   `,

   slideOutToRight: keyframes`
      100% {
         transform: translateX(100vw);
      }
   `,
};
