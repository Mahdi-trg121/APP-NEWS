// Format date to a more readable format
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Generate a random avatar color
export const getAvatarColor = (name) => {
  const colors = [
    'bg-blue-100 text-blue-800', 
    'bg-green-100 text-green-800', 
    'bg-yellow-100 text-yellow-800',
    'bg-red-100 text-red-800', 
    'bg-purple-100 text-purple-800', 
    'bg-pink-100 text-pink-800'
  ];
  
  // Simple hash function to always get the same color for the same user
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};