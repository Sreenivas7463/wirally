export function getDate(date){
    return new Date(date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',

        hour: '2-digit', minute: 'numeric', second: 'numeric',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      });
}