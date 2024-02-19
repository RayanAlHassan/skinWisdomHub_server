import testimoniolSchema from "../models/testimoniolModel.js";

// Get all Testeminol
export const getAllTestimoniol = async (req, res) => {
  try {
    const testimoniols = await testimoniolSchema.find().sort({ createdAt: -1 });
    res.status(201).json(testimoniols);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add A Testeminol
export const addTesteminol = async (req, res) => {
  const { feedback,userID } = req.body;

  try {
    if (!feedback  || !userID  ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newTestimoniol = await testimoniolSchema.create({
      feedback,userID 
    });
    return res.status(200).json(newTestimoniol);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an Testeminol
export const updateTesteminol = async (req, res) => {
  const id = req.params.id;
  const {  feedback,userID} = req.body;

  try {
    const existingTestimoniol = await testimoniolSchema.findById(id);
    if (!existingTestimoniol) {
      return res.status(404).json({ error: "Testeminol not found" });
    }

    if ( feedback) existingTestimoniol.feedback =  feedback;
    if ( userID) existingTestimoniol.userID =  userID;

    const updatedTesteminol = await existingTestimoniol.save();

    return res.status(200).json(updatedTesteminol);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Delete an Testeminol
export const deleteTesteminol = async (req, res) => {
    const id = req.params.id;
    try {
      const existingTestimoniol = await testimoniolSchema.findById(id);
  
      if (!existingTestimoniol) {
        return res.status(404).json({ error: "Testeminol not found" });
      }
  
      await testimoniolSchema.deleteOne({ _id: id });
  
      res.status(200).json({ message: "Testeminol deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
