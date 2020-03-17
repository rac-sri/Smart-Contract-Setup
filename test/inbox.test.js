const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface , bytecode} = require('../compile');
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async ()=>{
accounts = await web3.eth.getAccounts();

//use one of the accounts go deploy
//the contract
inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode , arguments:[
        'Hi there'
    ]})
    .send({from: accounts[0], gas:'1000000'})
});

describe('inbox',()=>{
  it('deploys a contract',()=>{
      console.log(inbox)})  ;
it('has a default message', async()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there');
       });

    it('can change the message',async ()=>{
        await inbox.methods.setMessage('bye').send({from: accounts[0]})
    })

});