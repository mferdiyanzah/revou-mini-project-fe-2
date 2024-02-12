import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PersonalInformation from "../../components/personal-information";
import * as dayjs from "dayjs";

describe("PersonalInformation", () => {
  test("renders the form correctly", () => {
    render(<PersonalInformation onNext={() => {}} />);

    // Assert that the form inputs are rendered
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Date of Birth")).toBeInTheDocument();

    // Assert that the Next button is rendered
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  test("disables the Next button when form is empty", () => {
    render(<PersonalInformation onNext={() => {}} />);

    // Assert that the Next button is initially disabled
    expect(screen.getByText("Next")).toBeDisabled();
  });

  test("enables the Next button when form is filled", async () => {
    const onNextMock = jest.fn();
    render(<PersonalInformation onNext={onNextMock} />);

    // Fill in the form inputs
    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john.doe@example.com" },
    });

    const today = dayjs().format("DD MMMM YYYY");

    const datepicker = screen.getByLabelText("Date of Birth");
    expect(datepicker).toBeVisible();

    datepicker.click();
    await waitFor(() => {
      expect(screen.getByText("Today")).toBeVisible();
    });

    screen.getByText("Today").click();
    await waitFor(() => {
      expect(datepicker).toHaveValue(today);
    });

    expect(screen.getByText("Next")).toBeEnabled();

    screen.getByText("Next").click();
    await waitFor(() => {
      expect(onNextMock).toHaveBeenCalled();
    });
  });
});
