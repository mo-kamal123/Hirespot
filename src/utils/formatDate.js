export function formatDate(dateString) {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short'
    }).format(new Date(dateString));
  }
