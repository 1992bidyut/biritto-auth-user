const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const path = require('path');
const fs = require('fs');

// @desc    Get current user profile
// @route   GET /api/v1/profile/me
// @access  Private
exports.getMyProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user profile
// @route   PUT /api/v1/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    'profile.bio': req.body.bio,
    'profile.website': req.body.website,
    'profile.location': req.body.location,
    'profile.social': req.body.social,
    'profile.skills': req.body.skills,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Add education to profile
// @route   PUT /api/v1/profile/education
// @access  Private
exports.addEducation = asyncHandler(async (req, res, next) => {
  const newEdu = {
    school: req.body.school,
    degree: req.body.degree,
    fieldOfStudy: req.body.fieldOfStudy,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description
  };

  const user = await User.findById(req.user.id);

  user.profile.education.unshift(newEdu);

  await user.save();

  res.status(200).json({
    success: true,
    data: user.profile
  });
});

// @desc    Delete education from profile
// @route   DELETE /api/v1/profile/education/:edu_id
// @access  Private
exports.deleteEducation = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  // Find education index
  const removeIndex = user.profile.education
    .map(item => item.id)
    .indexOf(req.params.edu_id);

  if (removeIndex === -1) {
    return next(new ErrorResponse('Education not found', 404));
  }

  user.profile.education.splice(removeIndex, 1);

  await user.save();

  res.status(200).json({
    success: true,
    data: user.profile.education
  });
});

// @desc    Upload profile photo
// @route   PUT /api/v1/profile/photo
// @access  Private
exports.uploadProfilePhoto = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse('Please upload a file', 400));
  }

  const file = req.files.file;

  // Check if image
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please upload an image file', 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${req.user.id}${path.parse(file.name).ext}`;
  console.log('file.name: ',file.name)
  file.mv(`public/upload/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse('Problem with file upload', 500));
    }

    await User.findByIdAndUpdate(req.user.id, {
      'profile.profilePhoto': `/public/upload/${file.name}`
    });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});

// @desc    Delete profile photo
// @route   DELETE /api/v1/profile/photo
// @access  Private
exports.deleteProfilePhoto = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.profile.profilePhoto === 'default.jpg') {
    return next(new ErrorResponse('No profile photo to delete', 400));
  }

  const filePath = `${process.env.FILE_UPLOAD_PATH}/${user.profile.profilePhoto}`;

  fs.unlink(filePath, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse('Problem deleting file', 500));
    }

    await User.findByIdAndUpdate(req.user.id, {
      'profile.profilePhoto': 'default.jpg'
    });

    res.status(200).json({
      success: true,
      data: {}
    });
  });
});