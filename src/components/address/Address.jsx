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
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useAddressStore } from "../../store/use-address-store"; // Importa la store
import "./Address.css";

const departments = [
  "Antioquia",
  "Bogotá",
  "Cundinamarca",
  "Valle del Cauca",
  "Atlántico",
];

const citiesByDepartment = {
  Antioquia: ["Medellín", "Envigado", "Bello"],
  Bogotá: ["Bogotá D.C."],
  Cundinamarca: ["Soacha", "Zipaquirá", "Chía"],
  "Valle del Cauca": ["Cali", "Palmira", "Buenaventura"],
  Atlántico: ["Barranquilla", "Soledad", "Malambo"],
};

export const Address = () => {
  const navigate = useNavigate();
  const schema = z.object({
    name: z.string().min(2, "El nombre es obligatorio"),
    last_name: z.string().min(2, "El apellido es obligatorio"),
    phone: z.string().regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos"),
    departament: z.string().min(2, "El Departamento es obligatorio"),
    city: z.string().min(2, "La ciudad es obligatoria"),
    address: z.string().min(2, "La Dirección es obligatoria"),
  });

  // Obtener estado y acciones de la store
  const {
    name,
    last_name,
    phone,
    departament,
    city,
    address,
    setAddress,
    resetAddress,
  } = useAddressStore();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { name, last_name, phone, departament, city, address }, // Inicializar con los valores de la store
  });

  const selectedDepartment = watch("departament", "");

  // Cargar los valores almacenados en la store cuando el formulario se monta
  useEffect(() => {
    setValue("name", name);
    setValue("last_name", last_name);
    setValue("phone", phone);
    setValue("departament", departament);
    setValue("city", city);
    setValue("address", address);
  }, [name, last_name, phone, departament, city, address, setValue]);

  const onSubmit = (data) => {
    setAddress(data); // Guardar en la store cuando se envía el formulario
    console.log("Dirección guardada:", data);
    navigate(`/cart/order`)

  };

  return (
    <Container className="container-cart-item">
      <Row className="justify-content-center">
        <Col xs={10} sm={10} md={10} lg={10} xl={5} xxl={5}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <div className="title-address mt-5 mb-2">Datos para envio</div>
              <Col xs={10} sm={10} md={10} lg={10} xl={5} xxl={5}>
                <TextField
                  {...register("name")}
                  label="Nombre"
                  fullWidth
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Col>

              <Col xs={10} sm={10} md={10} lg={10} xl={5} xxl={5}>
                <TextField
                  {...register("last_name")}
                  label="Apellido"
                  fullWidth
                  margin="normal"
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={10} sm={10} md={10} lg={10} xl={5} xxl={5}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Teléfono"
                      fullWidth
                      margin="normal"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      onChange={(e) => {
                        let value = e.target.value
                          .replace(/[^0-9]/g, "")
                          .slice(0, 10);
                        if (value.length > 0 && value[0] !== "3") value = "";
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </Col>

              <Col xs={10} sm={10} md={10} lg={10} xl={5} xxl={5}>
                <TextField
                  {...register("address")}
                  label="Dirección"
                  fullWidth
                  margin="normal"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={10} sm={10} md={10} lg={10} xl={5} xxl={5}>
                <Controller
                  name="departament"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={departments}
                      fullWidth
                      onChange={(_, value) => {
                        setValue("departament", value || "");
                        setValue("city", ""); // Reset city when departa
                        // ment changes
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Departamento"
                          margin="normal"
                          error={!!errors.departament}
                          helperText={errors.departament?.message}
                        />
                      )}
                    />
                  )}
                />
              </Col>

              <Col xs={10} sm={10} md={10} lg={10} xl={5} xxl={5}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.city}
                    >
                      <Autocomplete
                        {...field}
                        options={citiesByDepartment[selectedDepartment] || []}
                        getOptionLabel={(option) => option}
                        value={field.value || ""}
                        onChange={(_, newValue) => setValue("city", newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Ciudad"
                            error={!!errors.city}
                          />
                        )}
                      />
                    </FormControl>
                  )}
                />
              </Col>
            </Row>
            <div className="mt-3">
              <Button type="submit" variant="contained" color="primary">
                Confirmar
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};
