const chai=require('chai');
const expect=chai.expect;

const{loginGet,loginPost}=require('../controllers/authControllers');

describe('Test /',()=>{

    describe('Health check on /',()=>{
        it('health should be okey',()=>{
            const actualResult = loginGet();
            expect(actualResult).to.equal('OK'); 
        });
    });

    describe('Health check on /',()=>{
        it('health should be okey', async()=>{
            const actualResult = await loginPost();
            expect(actualResult).to.equal('OK'); 
        });
    });

});