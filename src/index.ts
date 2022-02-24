export class Challenge {
    name: string;

    constructor() {
        this.name = "buzz";
        
    }
    
    public buzzNormal(i: number):string {
          if (i % 5 === 0 && i % 3 == 0) {
            return "fizzbuzz";
          } else if (i % 3 === 0) {
            return "fizz";
          } else if (i % 5 === 0) {
            return "buzz";
          } else {
            return `${i}`;
        }
    }
    
    public buzzPromise(i: number): Promise<string> {
        return new Promise((resolve, reject)=>{
            if (i % 5 === 0 && i % 3 == 0) {
                resolve ('fizzbuzz');
              } else if (i % 3 === 0) {
                resolve ('fizz');
              } else if (i % 5 === 0) {
                resolve ("buzz");
              } else {
                resolve (`${i}`);
            }
        }) 
    }
}

