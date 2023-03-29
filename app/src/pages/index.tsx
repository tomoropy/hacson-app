// index.tsx
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const IndexPage = () => {
  const [formData, setFormData] = useState({
    scene: "",
    date: new Date(),
    location: "",
    age: "",
    height: "",
    hobbies: "",
    favoriteCelebrity: "",
    occupation: "",
  });
  const [response, setResponse] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: Date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/submitForm", formData);
      setResponse(response.data.answer);
    } catch (error) {
      // console.error("Error:", error.message);
    }
  };

  return (
    <Box>
      <VStack
        as="form"
        onSubmit={handleSubmit}
        spacing={6}
        width="300px"
        mx="auto"
      >
        {/* Scene */}
        <FormControl>
          <FormLabel htmlFor="scene">シーン</FormLabel>
          <Input
            type="text"
            id="scene"
            name="scene"
            value={formData.scene}
            onChange={handleChange}
            required
          />
        </FormControl>

        {/* Date */}
        <FormControl>
          <FormLabel htmlFor="date">日付</FormLabel>
          <DatePicker
            id="date"
            selected={formData.date}
            dateFormat="yyyy/MM/dd"
            onChange={handleDateChange}
            required
          />
        </FormControl>

        {/* Location */}
        <FormControl>
          <FormLabel htmlFor="location">場所</FormLabel>
          <Select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value="">選択してください</option>
            {/* 以下のリストを実際のエリアリストに置き換えてください */}
            <option value="tokyo">東京</option>
            <option value="osaka">大阪</option>
            <option value="hokkaido">北海道</option>
            <option value="okinawa">沖縄</option>
          </Select>
        </FormControl>

        {/* Age */}
        <FormControl>
          <FormLabel htmlFor="age">年齢</FormLabel>
          <Input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </FormControl>

        {/* Height */}
        <FormControl>
          <FormLabel htmlFor="height">身長</FormLabel>
          <Input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </FormControl>

        {/* Hobbies */}
        <FormControl>
          <FormLabel htmlFor="hobbies">趣味</FormLabel>
          <Input
            type="text"
            id="hobbies"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            required
          />
        </FormControl>

        {/* Favorite Celebrity */}
        <FormControl>
          <FormLabel htmlFor="favoriteCelebrity">好きな芸能人</FormLabel>
          <Input
            type="text"
            id="favoriteCelebrity"
            name="favoriteCelebrity"
            value={formData.favoriteCelebrity}
            onChange={handleChange}
            required
          />
        </FormControl>

        {/* Occupation */}
        <FormControl>
          <FormLabel htmlFor="occupation">職種</FormLabel>
          <Input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
          />
        </FormControl>

        <Button type="submit" colorScheme="teal">
          送信
        </Button>
      </VStack>

      {response && (
        <Box mt={4}>
          <Text>回答:</Text>
          <Text>{response}</Text>
        </Box>
      )}
    </Box>
  );
};

export default IndexPage;
