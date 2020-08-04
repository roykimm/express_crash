const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const templateWords = [
    {
        wordseq : 1, 
        wordengnm : 'go',
        wordkornm : '가다'
        
    },
    {
        wordseq : 2, 
        wordengnm : 'fishing',
        wordkornm : '낚시하다'
        
    },
    {
        wordseq : 3, 
        wordengnm : 'catch',
        wordkornm : '잡다'
        
    },
]
// gets all words
router.get('/', (req,res) => {
    res.json(templateWords);
})

module.exports = router;