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

// export default randomNum;