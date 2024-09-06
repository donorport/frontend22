import styled from "styled-components";

export const ButtonContent = styled.div`
  ${(props) =>
    props.size === "lg" &&
    `
    height: 24px;
    // width: 24px;
    `}
  ${(props) =>
    props.size === "md" &&
    `
    height: 20px;
    // width: 20px;
    `}

${(props) =>
    props.bgColor &&
    `
    background-color: ${props.bgColor};
    `}
`;
