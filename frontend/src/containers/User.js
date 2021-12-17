import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate as useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../lib/errorLib";

export default function User() {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    function loadUser() {
      return API.get("brownie", `/users/${id}`);
    }

    async function onLoad() {
      try {
        const user = await loadUser();

        setUser(user);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  return (
    <div>
      <ListItem>
      </ListItem>
    </div>
  );
}