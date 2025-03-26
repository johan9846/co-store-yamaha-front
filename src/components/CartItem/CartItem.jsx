import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useCartStore } from "../../store/use-cart-store";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMemo, useState } from "react";
import "./CartItem.css";

export const CartItem = () => {
  const carouselSettings = {
    dots: true, // Muestra puntos de navegación
    infinite: true, // Permite navegación infinita
    speed: 1000, // Velocidad de transición
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: 1, // Muestra una imagen a la vez
    slidesToScroll: 1, // Avanza de una en una
    arrows: false, // Muestra flechas de navegación
  };

  const [totalAmount, setTotalAmount] = useState("");
  const formatCurrency = (value) =>
    `$ ${Number(value || 0).toLocaleString("es-CO")}`;
  const {
    productData,
    incrementQuantity,
    deleteFromCart,
    decrementQuantity,
    resetCart,
  } = useCartStore();

  const schema = z.object({
    name: z.string().min(2, "El nombre es obligatorio"),
    last_name: z.string().min(2, "El apellido es obligatorio"),
    phone: z.string().regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos"),
    email: z
      .string({
        required_error: "El correo electrónico no puede estar vacío",
      })
      .refine(
        (value) =>
          /^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9*])*([\:._-])?([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/gi.test(
            value
          ),
        {
          message: "El correo electrónico no es valido",
        }
      ),
    value: z.number().min(1000, "El monto mínimo es 1000 COP"),
    paymentMethod: z.enum(["NEQUI", "PSE"]),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      last_name: "",
      phone: "",
      email: "",
      paymentMethod: "NEQUI",
    },
  });

  useMemo(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmount(price);
    setValue("value", price);
  }, [productData]);

  const onSubmit = (data) => {
    console.log(data, "data");
  };

  const isNumber = (character) => {
    const code = character.charCodeAt(0);
    return code >= 48 && code <= 57; // Código ASCII del 0 al 9
  };

  const handleCheckout = () => {};
  return (
    <>
      <Container className="container-cart-item">
        <div>
          <h2 className="mt-4">Carrito de compras</h2>
        </div>

        <Row>
          <Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
            {productData.map((item, key) => (
              <Row className="d-flex justify-content-center mt-5" key={key}>
                <Col
                  xs={1}
                  sm={1}
                  md={1}
                  lg={1}
                  xl={1}
                  xxl={1}
                  className="detele-item-cart"
                >
                  <CloseIcon
                    onClick={() => deleteFromCart(item.id)}
                    sx={{ cursor: "pointer" }}
                  />
                </Col>

                <Col
                  xs={5}
                  sm={5}
                  md={5}
                  lg={5}
                  xl={3}
                  xxl={3}
                  className="image-cart"
                >
                  <Slider
                    {...carouselSettings}
                    className="container-carrousell"
                  >
                    {item.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Imagen ${index + 1}`}
                        className="image-slick"
                      />
                    ))}
                  </Slider>
                </Col>

                <Col
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={4}
                  xxl={4}
                  className="title-product"
                >
                  <div>{item.name} </div>
                  <div>
                    {item.brands.map((brand) => brand.name).join(", ")} -{" "}
                    {item.brands
                      .map((brand) => brand.models.join(", "))
                      .join(" | ")}
                  </div>
                </Col>

                <Col
                  xs={12}
                  sm={12}
                  md={7}
                  lg={6}
                  xl={4}
                  xxl={4}
                  className="container-amount mt-5 mt-xl-0"
                >
                  <div>Cantidad</div>

                  <div className="amount-counter">
                    <div
                      className="button-amount"
                      onClick={() => decrementQuantity(item.id)}
                    >
                      -
                    </div>

                    <span>{item.quantity}</span>

                    <div
                      className="button-amount"
                      onClick={() => incrementQuantity(item.id)}
                    >
                      +
                    </div>
                  </div>
                  <div>{formatCurrency(item.price * item.quantity)}</div>
                </Col>
              </Row>
            ))}
          </Col>

          <Col className="tarjet-pay mt-5 mt-xl-3">
            <Row className="justify-content-center">
              <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                <div className="card-pay">
                  <h2>Total</h2>
                  <span>COP {formatCurrency(totalAmount)}</span>
                  <hr />

                  <form onSubmit={handleSubmit(onSubmit)}>
                    {productData.length > 0 && (
                      <>
                        <Controller
                          name="name"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Nombre"
                              fullWidth
                              margin="normal"
                              error={!!errors.name}
                              helperText={errors.name?.message}
                            />
                          )}
                        />

                        <Controller
                          name="last_name"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Apellido"
                              fullWidth
                              margin="normal"
                              error={!!errors.last_name}
                              helperText={errors.last_name?.message}
                            />
                          )}
                        />

                        <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Teléfono"
                              fullWidth
                              margin="normal"
                              value={field.value}
                              error={!!errors.phone}
                              helperText={errors.phone?.message}
                              onChange={(e) => {
                                let value = e.target.value;

                                // Filtrar caracteres que no sean números
                                value = value
                                  .split("")
                                  .filter((char) => isNumber(char))
                                  .join("");

                                // Limitar a 10 dígitos
                                if (value.length > 10)
                                  value = value.substring(0, 10);

                                // Validar que empiece con "3"
                                if (value.length > 0 && value[0] !== "3")
                                  value = "";

                                // Actualizar el valor en el formulario
                                field.onChange(value);
                              }}
                            />
                          )}
                        />

                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Correo Electrónico"
                              type="email"
                              fullWidth
                              margin="normal"
                              error={!!errors.email}
                              helperText={errors.email?.message}
                            />
                          )}
                        />

                        <Controller
                          name="value"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Monto"
                              type="text"
                              disabled={true}
                              fullWidth
                              margin="normal"
                              error={!!errors.value}
                              helperText={
                                !!errors.value && "Ingresa un número mayor a 0"
                              }
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                field.onChange(
                                  numericValue ? Number(numericValue) : 0
                                );
                              }}
                              value={formatCurrency(field.value)}
                            />
                          )}
                        />

                        <Controller
                          name="paymentMethod"
                          control={control}
                          render={({ field }) => (
                            <FormControl
                              fullWidth
                              margin="normal"
                              error={!!errors.paymentMethod}
                            >
                              <InputLabel>Método de Pago</InputLabel>
                              <Select {...field} label="Método de Pago">
                                <MenuItem value="NEQUI">Nequi</MenuItem>
                                <MenuItem value="PSE">PSE</MenuItem>
                              </Select>
                            </FormControl>
                          )}
                        />

                        <div className="mt-3">
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                          >
                            Pagar
                          </Button>
                        </div>
                      </>
                    )}
                  </form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="mt-5 mb-5">
          <Col>
            <Button
              onClick={() => resetCart()}
              variant="contained"
              color="error"
            >
              Limpiar Carrito
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
