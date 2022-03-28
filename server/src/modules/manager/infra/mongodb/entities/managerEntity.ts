import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    id: {
      auto: true,
      type: String,
      unique: true
    },

    address: {
      type: Object
    },

    full_name: {
      type: String
    },

    user_id: {
      type: String
    },

    email: {
      type: String,
      unique: true
    },

    phone: {
      type: String,
      unique: true
    },

    disabled: {
      type: String
    },

    profile_image_url: {
      type: String
    },

    role: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Manager', schema)
