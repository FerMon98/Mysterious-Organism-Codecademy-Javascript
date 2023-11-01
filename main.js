// Helper function to generate a random base
const returnRandBase = () => {
  const bases = ['A', 'T', 'C', 'G'];
  const randomIndex = Math.floor(Math.random() * bases.length);
  return bases[randomIndex];
};

// Helper function to create a mock DNA strand with 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    // Method to simulate a mutation
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (newBase === this.dna[randomIndex]) {
        newBase = returnRandBase();
      }
      this.dna[randomIndex] = newBase;
      return this.dna;
    },

    compareDNA(pAequor) {
      let identicalBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          identicalBases++;
        }
      }
      const percentage = (identicalBases / this.dna.length) * 100;
      console.log(`Specimen #${this.specimenNum} and Specimen #${pAequor.specimenNum} have ${percentage.toFixed(2)}% DNA in common.`);
    },

    willLikelySurvive() {
      const cgCount = this.dna.filter(base => base === 'C' || base === 'G').length;
      const percentage = (cgCount / this.dna.length) * 100;
      return percentage >= 60;
    }
  };
};


const pAequorArray = [];
let specimenNum = 1;
while (pAequorArray.length < 30) {
  const newDna = mockUpStrand();
  const newOrganism = pAequorFactory(specimenNum, newDna);
  if (newOrganism.willLikelySurvive()) {
    pAequorArray.push(newOrganism);
    specimenNum++;
  }
}