import * as Yup from "yup";

export const AvatarSchema = Yup.object().shape({
  avatar: Yup.mixed()
    .required("Avatar is gerekli")
    .test(
      "fileSize",
      "File size is too large",
      (value) => value && value.size <= 5242880
    )
    .test(
      "fileType",
      "Unsupported File Format",
      (value) => value && ["image/jpeg", "image/png"].includes(value.type)
    ),
});
