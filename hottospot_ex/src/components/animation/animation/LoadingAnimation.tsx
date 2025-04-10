import { useRive } from '@rive-app/react-canvas';
import { motion } from 'framer-motion';

export default function LoadingAnimation({ message }) {
  const STATE_MACHINE_NAME = 'State Machine 1';

  const { rive, RiveComponent } = useRive({
    src: '/animations/fileBackGround.riv',
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    artboard: 'Artboard 2',
    fit: 'cover',
  });

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -80%)',
          width: '100%',
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#ffffff',
        }}
      >
        {message}
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }} // 透明度を変化
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2, // 順番に表示
            }}
          >
            .
          </motion.span>
        ))}
      </div>
      <RiveComponent
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: '-1',
        }}
      />
    </div>
  );
}
