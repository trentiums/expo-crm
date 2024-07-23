import { ThemedStyledInterface } from "styled-components/index";
import baseStyled from "styled-components/native";
import { AppTheme } from "../constants/theme";

export const styled = baseStyled as unknown as ThemedStyledInterface<AppTheme>;
