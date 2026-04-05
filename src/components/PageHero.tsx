import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  image: string;
}

const PageHero = ({ title, subtitle, image }: Props) => (
  <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 overlay-gradient" />
    <div className="relative z-10 text-center container-custom">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-4"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-primary-foreground/70 font-body max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  </section>
);

export default PageHero;
