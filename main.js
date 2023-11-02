// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Factory Function to create multiple P.aequor objects.
const pAequorFactory = (inputNum, inputStrand) => {
  return {
    specimenNum: inputNum,
    dna: inputStrand,
    mutate() {
      const randomIndex = (Math.floor(Math.random() * 15));
      const currentBase = this.dna[randomIndex];
      let newBase = returnRandBase();

      while (currentBase === newBase) {
        newBase = returnRandBase();
      }

      this.dna[randomIndex] = newBase;
      return this.dna;
      
    },
    compareDNA(otropAequorObj) {
      let sameBaseSameLoc = 0;
      for(let x = 0; x < this.dna.length; x++){
        if(this.dna[x] === otropAequorObj.dna[x]) {
          sameBaseSameLoc++;
        }
      };
      let percentCommon = (sameBaseSameLoc/15) *100;
      percentCommon = percentCommon.toFixed(1);

      console.log(`Specimen #${this.specimenNum} and specimen #${otropAequorObj.specimenNum} have ${percentCommon}% DNA in common.`);

    },
    willLikelySurvive() {
      let strongBases = 0;

      for (let x = 0; x < this.dna.length; x++) {
        if (this.dna[x] === 'C' || this.dna[x] === 'G') {
          strongBases++
        }
      }

      const survivalRate = (strongBases / 15) * 100;

      if (survivalRate >= 60){
        return true;
      } else {
        return false;
      }
    }
  }
}

const survivingSpecimen = [];
let idCounter = 1;

while (survivingSpecimen.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpecimen.push(newOrg);
  }
  idCounter++;
}

console.log(survivingSpecimen)






