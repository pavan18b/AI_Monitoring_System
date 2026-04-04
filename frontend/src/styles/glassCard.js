const glassCard = {
  backdropFilter: "blur(16px)",
  background: "rgba(255, 255, 255, 0.08)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
  transition: "0.3s",
  color: "#e2e8f0",

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
  },
};

export default glassCard;