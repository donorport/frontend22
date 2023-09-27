import { css } from "styled-components";

export const mixin = {

  backgroundImage: (imageURL) => css`
    background-image: url("${imageURL}");
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
  `,
};
