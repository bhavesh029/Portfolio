const Footer = () => {
  return (
    <footer className="bg-white border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <span className="font-display text-xl font-bold text-primary tracking-tight">
            Bhavesh Chauhan<span className="text-accent">.</span>
          </span>
          <p className="text-text-secondary text-sm mt-2">
            &copy; 2025 Bhavesh Chauhan. All Rights Reserved.
          </p>
        </div>

        <div className="flex gap-6">
          <a
            href="https://linkedin.com/in/bhavesh029/"
            target="_blank"
            className="text-text-muted hover:text-primary transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/bhavesh029"
            target="_blank"
            className="text-text-muted hover:text-primary transition-colors duration-300"
          >
            GitHub
          </a>
          <a
            href="mailto:bhaveshchouhan399@gmail.com"
            className="text-text-muted hover:text-primary transition-colors duration-300"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
