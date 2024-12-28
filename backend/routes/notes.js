const express = require('express');
const router = express.Router();
const Notes = require('../models/Note');
let fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb'); // Import ObjectId from MongoDB library

router.get('/fetchallnotes', fetchuser,
    async (req, res) => {
        try {
            //fetch all the notes linked with the user id
            const note = await Notes.find({ user: req.user.id })
            res.json(note)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error has occured")
        }
    })

router.post('/addnote', fetchuser, [
    body('title', 'title must contains atleast 3 characters').isLength({ min: 3 }),
    body('description', 'Description must contains atleast 5 characters').isLength({ min: 5 }),
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {

            const note = await Notes.create({
                user: req.user.id,
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag,
                status: req.body.status
            })

            res.send(note)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error has occured")
        }
    })

router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        try{ 
        let { title, description, tag,status } = req.body;
       
            //create a new note object
            const newNote = {}
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };
            if (status) {newNote.status=status};
            // if(status) { newNode.status=status};
            //find the note to be updated and update it
            let note = await Notes.findById(req.params.id);
            if (!note) {
                return res.status(404).send("Not Found");
            }
            if (note.user.toString() !== req.user.id) {
                return res.status(404).send("Not Allowed")
            }
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({note} )
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error has occured")
        }
     
    })


router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {
           try{ 
            //find the note to be updated and delete it
            let note = await Notes.findById(req.params.id);
            if (!note) {
                return res.status(404).send("Not Found");
            }
            //allow deletion only if user owns this note
            if (note.user.toString() !== req.user.id) {
                return res.status(404).send("Not Allowed")
            }
            note = await Notes.findByIdAndDelete(req.params.id )
            res.json("Deleted" )
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error has occured")
        }
     
    })

router.get('/gethabitsprogress/:id',async (req,res)=>{
    try {
        const userId = req.params.id; 
        if (!userId) {
          return res.status(400).json({ error: "User ID is required" });
        }

    
        const habits = await Notes.find({ user:userId });
        if (!habits.length) {
          return res.status(404).json({ error: "No habits found for this user" });
        }
    
        const totalHabits = habits.length;
        const completedHabits = habits.filter(habit => habit.status === 'Completed').length;
    
        return res.json({
          totalHabits,
          completedHabits,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching habits" });
      }
})

module.exports = router