window.expect = chai.expect;

const wow = {
    a: 1,
    b: 2
};

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
        const { b } = wow;
        const run = () => {
            return b + 3;
        }
        expect(run()).to.equal(5);
        expect([1,2,3].indexOf(4)).to.equal(-1);
    });
  });
});