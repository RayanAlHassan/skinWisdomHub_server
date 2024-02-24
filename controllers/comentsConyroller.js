// import comentsSchema from "../models/comentsModel.js";

// // Get all coments
// export const getAllTestimoniol = async (req, res) => {
//   try {
//     const testimoniols = await comentsSchema.find().sort({ createdAt: -1 });
//     res.status(201).json(testimoniols);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Add A coments
// export const addcoments = async (req, res) => {
//   const { feedback, userID } = req.body;
//   console.log("Received data:", { feedback, userID });

//   try {
//     if (!feedback || !userID) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Logging MongoDB query
//     console.log("Inserting document into MongoDB...");
//     const newTestimoniol = await comentsSchema.create({
//       feedback,
//       userID,
//     });

//     console.log("Document inserted successfully:", newTestimoniol);
//     return res.status(200).json(newTestimoniol);
//   } catch (error) {
//     console.log("Error occurred:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };


// // Update an coments
// export const updatecoments = async (req, res) => {
//   const id = req.params.id;
//   const {  feedback,userID} = req.body;

//   try {
//     const existingTestimoniol = await comentsSchema.findById(id);
//     if (!existingTestimoniol) {
//       return res.status(404).json({ error: "coments not found" });
//     }

//     if ( feedback) existingTestimoniol.feedback =  feedback;
//     if ( userID) existingTestimoniol.userID =  userID;

//     const updatedcoments = await existingTestimoniol.save();

//     return res.status(200).json(updatedcoments);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };


// // Delete an coments
// export const deletecoments = async (req, res) => {
//     const id = req.params.id;
//     try {
//       const existingTestimoniol = await comentsSchema.findById(id);
  
//       if (!existingTestimoniol) {
//         return res.status(404).json({ error: "coments not found" });
//       }
  
//       await comentsSchema.deleteOne({ _id: id });
  
//       res.status(200).json({ message: "coments deleted successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   };
