// COMMON LABEL

export const LABEL = {
  //Button
  button: {
    addNew: "Add new",
    cancel: "Cancel",
    ok: "Confirm",
  },
  //Empty
  emptyData: "No data",
  //Menu
  dashBoard: "News",
  audio: "Songs",
  //Track table
  trackTable: {
    song: "Song",
    playlist: "Playlist",
    duration: "Duration"
  }
};

// COMMON MESSAGE
export const MESSAGE = {
  isRequired: "This field is required",
};

// AUTH FORM

export const AUTH_TEXT = {
  //label
  name: "Name",
  phoneNumber: "Phone Number",
  passWord: "Password",
  login: "Login",
  register: "Register",

  //message
};

export const TEXT = {
  common: {
    select: "Select",
    edit: (name) => `Edit ${name}`,
    confirm_delete:
      "This item has been allocated to the drivers. If deletion continues, the default item will be used instead",
  },
  button: {
    addNew: "Add New",
    edit: "Edit",
    cancel: "Cancel",
    ok: "Confirm",
    logout: "Logout",
  },
  driver: {
    driver: "Profile",
    name: "Name",
    phone: "Phone",
    gender: "Gender",
    DOB: "Birth day",
    citizen: "City",
    license: "License",
    brand: "Brand",
    car: "car",
    playlist: "Playlist",
    avatar: "Avatar",
  },
  audio: {
    audio: "Audio",
    audio_name: "Audio Name",
    price: "Price",
    durations: "Durations",
    link: "Link",
    type: "Type",
    image: "Image",
    file: "File",
  },
  playlist: {
    playlist: "Playlist",
    price: "Price",

    playlist_name: "Playlist Name",
    playlist_type: "Playlist Type",
    playlist_description: "Playlist Description",
    playlist_location: "Playlist Location",
  },
  status: {
    todo: "To do",
    inprogress: "Reject",
    done: "Done",
  },
  inquiry: {
    name: "Name",
    phone: "Phone",
    description: "Description",
    bank_account: "Bank account",
    bank_name: "Bank name",
    point: "Point",
    status: "status",
    view: "View inquiry",
  },
  required: {
    is_required: "This field is required",
  },
  confirm: {
    confirm_delete: "Are you sure want to delete?",
    confirm_logout: "Are you sure want to logout?",
  },
  message: {
    create_success: "Create successfully",
    update_success: "Update successfully",
    delete_success: "Delete successfully",
  },
};
