export const colorNum = () => {
    return Math.floor(Math.random() * 256)
}

export const formatter = (num) => {
  
    if (Math.abs(num) > 999999) {
      return Math.sign(num) * (Math.abs(num)/1000000).toFixed(1) + 'm';
    } else if (Math.abs(num) > 999) {
      return Math.sign(num) * (Math.abs(num)/1000).toFixed(1) + 'k';
    } else {
      return Math.sign(num) * Math.abs(num);
    }
    
}

export const timeAgo = (old) => {

  // preparing the diff between old time and now as in their UNIX
  const now = Date.now();
  const diff = now - old;

  // capturing the milliseconds for these times
  const msPerMin = 60 * 1000;
  const msPerHr = msPerMin * 60;
  const msPerDay = msPerHr * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  // then sending them forth into the conditional statement to take output
  if (diff < msPerMin) {
    return Math.floor(diff/1000) + ' seconds ago';   //
  }
  
  else if (diff < msPerHr) {
    return Math.floor(diff/msPerMin) + ' minutes ago'; //  
  }
  
  else if (diff < msPerDay ) {
    return Math.floor(diff/msPerHr ) + ' hours ago';   //
  }
  
  else if (diff < msPerDay * 2) {
    return Math.floor(diff/msPerDay) + ' day ago'; //
  }
  
  else if (diff < msPerMonth) {
    return Math.floor(diff/msPerDay) + ' days ago';   //
  }
  
  else if (diff < msPerMonth * 2) {
    return Math.floor(diff/msPerMonth) + ' month ago';   //
  }
  
  else if (diff < msPerYear) {
    return Math.floor(diff/msPerMonth) + ' months ago';  // 
  }
  
  else if (diff < msPerYear * 2) {
    return Math.floor(diff/msPerYear) + ' year ago';   //
  }
  
  else {
    return Math.floor(diff/msPerYear ) + ' years ago';   
  }

}

export const clock = (given) => {
  let timer = given;
  let count = 0;
  while (timer >= 60) {
    timer = timer - 60
    count++
  }
  
  if (given >= 60 && timer === 0) {
    return `${count}:${0}${0}`
  }
  if (given > 60 && timer < 60) {
    return `${count}:${timer >= 10 ? timer : `${0}${timer}`}`
  }
  if (given < 60) {
    return `${0}:${given >= 10 ? given : `${0}${given}`}`
  }
}